function VisitFilters({
  clinicians,
  patients,
  selectedClinician,
  selectedPatient,
  onClinicianChange,
  onPatientChange,
}) {
  const hasFilters =
    selectedClinician || selectedPatient;

  return (
    <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100">
            🔎
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Find Visits
            </h2>

            <p className="text-sm text-slate-500">
              Filter your visit history
            </p>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              onClinicianChange("");
              onPatientChange("");
            }}
            className="text-sm font-bold text-indigo-600 transition hover:text-indigo-800"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="filter-clinician"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
          >
            Clinician
          </label>

          <select
            id="filter-clinician"
            value={selectedClinician}
            onChange={(event) =>
              onClinicianChange(event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">
              All clinicians
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

        <div>
          <label
            htmlFor="filter-patient"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
          >
            Patient
          </label>

          <select
            id="filter-patient"
            value={selectedPatient}
            onChange={(event) =>
              onPatientChange(event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition hover:border-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
          >
            <option value="">
              All patients
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
      </div>
    </section>
  );
}

export default VisitFilters;