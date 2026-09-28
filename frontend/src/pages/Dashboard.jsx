import { useEffect, useMemo, useState } from "react";

import {
  getClinicians,
  getPatients,
  getVisits,
  createVisit,
} from "../services/api";

import VisitForm from "../components/VisitForm";
import VisitTable from "../components/VisitTable";
import VisitFilters from "../components/VisitFilters";

function Dashboard() {
  const [clinicians, setClinicians] = useState([]);
  const [patients, setPatients] = useState([]);
  const [visits, setVisits] = useState([]);

  const [selectedClinician, setSelectedClinician] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      setLoading(true);
      setError("");

      const [clinicianData, patientData, visitData] =
        await Promise.all([
          getClinicians(),
          getPatients(),
          getVisits(),
        ]);

      setClinicians(clinicianData);
      setPatients(patientData);
      setVisits(visitData);
    } catch (error) {
      console.error(error);
      setError("Unable to load application data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateVisit(visitData) {
    try {
      setError("");

      await createVisit(visitData);

      const updatedVisits = await getVisits();
      setVisits(updatedVisits);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to create visit."
      );

      throw error;
    }
  }

  const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      const clinicianMatches =
        !selectedClinician ||
        String(visit.clinician_id) === selectedClinician;

      const patientMatches =
        !selectedPatient ||
        String(visit.patient_id) === selectedPatient;

      return clinicianMatches && patientMatches;
    });
  }, [visits, selectedClinician, selectedPatient]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-12 w-72 animate-pulse rounded-xl bg-blue-100" />
          <div className="h-32 animate-pulse rounded-3xl bg-white shadow-sm" />
          <div className="h-96 animate-pulse rounded-3xl bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50">
      {/* HEADER */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 text-white">
        <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl shadow-lg ring-1 ring-white/20 backdrop-blur">
                📖
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Patient Visit Tracker
                </h1>

                <p className="text-sm text-blue-100">
                  Patient Visit Management Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            Healthcare Dashboard
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Patient Visits
          </h2>

          <p className="mt-2 max-w-2xl text-slate-500">
            Manage clinicians, patients and consultation records
            from one simple workspace.
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Clinicians"
            value={clinicians.length}
            description="Registered clinicians"
            icon="🩺"
            gradient="from-blue-100 to-cyan-100"
          />

          <StatCard
            title="Patients"
            value={patients.length}
            description="Registered patients"
            icon="👤"
            gradient="from-blue-100 to-cyan-100"
          />

          <StatCard
            title="Total Visits"
            value={visits.length}
            description="Recorded consultations"
            icon="📅"
            gradient="from-blue-100 to-cyan-100"
          />
        </div>

        {/* ERROR */}
        {error && (
          <div
            role="alert"
            className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-sm"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              !
            </span>

            {error}
          </div>
        )}

        {/* RECORD VISIT */}
        <VisitForm
          clinicians={clinicians}
          patients={patients}
          onSubmit={handleCreateVisit}
        />

        {/* FILTERS */}
        <VisitFilters
          clinicians={clinicians}
          patients={patients}
          selectedClinician={selectedClinician}
          selectedPatient={selectedPatient}
          onClinicianChange={setSelectedClinician}
          onPatientChange={setSelectedPatient}
        />

        {/* TABLE */}
        <VisitTable visits={filteredVisits} />
      </main>

      <footer className="py-8 text-center text-xs text-slate-400">
        CareTrack · Patient Visit Management
      </footer>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  gradient,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-xs font-medium text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-xl text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;