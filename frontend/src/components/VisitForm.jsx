import { useState } from "react";

function VisitForm({
  clinicians,
  patients,
  onSubmit,
}) {
  const [clinicianId, setClinicianId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!clinicianId || !patientId) {
      return;
    }

    try {
      setSubmitting(true);

      await onSubmit({
        clinicianId: Number(clinicianId),
        patientId: Number(patientId),
        notes,
      });

      setClinicianId("");
      setPatientId("");
      setNotes("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-100/40">
      {/* Decorative gradient */}
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative border-b border-blue-50 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-xl text-white shadow-lg shadow-blue-500/30">
            ✏️
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Record New Visit
            </h2>

            <p className="text-sm text-slate-500">
              Add a new patient consultation record
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative grid gap-5 p-6 md:grid-cols-2"
      >
        {/* Clinician */}
        <div>
          <label
            htmlFor="clinician"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Clinician
          </label>

          <select
            id="clinician"
            value={clinicianId}
            onChange={(event) =>
              setClinicianId(event.target.value)
            }
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition-all hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">
              Select clinician
            </option>

            {clinicians.map((clinician) => (
              <option
                key={clinician.id}
                value={clinician.id}
              >
                {clinician.name}
              </option>
            ))}
          </select>
        </div>

        {/* Patient */}
        <div>
          <label
            htmlFor="patient"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Patient
          </label>

          <select
            id="patient"
            value={patientId}
            onChange={(event) =>
              setPatientId(event.target.value)
            }
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition-all hover:border-indigo-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          >
            <option value="">
              Select patient
            </option>

            {patients.map((patient) => (
              <option
                key={patient.id}
                value={patient.id}
              >
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label
            htmlFor="notes"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Visit Notes
          </label>

          <textarea
            id="notes"
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            placeholder="Add relevant notes about this patient visit..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Button */}
        <div className="flex justify-end md:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Recording..."
              : "+ Record Visit"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default VisitForm;