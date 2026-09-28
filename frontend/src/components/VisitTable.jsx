function VisitTable({ visits }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 px-6 py-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 text-lg">
            📅
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Recent Visits
            </h2>

            <p className="text-sm text-slate-500">
              Latest patient consultations
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700">
          {visits.length}{" "}
          {visits.length === 1 ? "Visit" : "Visits"}
        </span>
      </div>

      {visits.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 text-3xl">
            📅
          </div>

          <h3 className="text-lg font-bold text-slate-900">
            No visits found
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500">
            There are no visits matching your current filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Clinician
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Patient
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Notes
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {visits.map((visit) => (
                <tr
                  key={visit.id}
                  className="group border-t border-slate-100 transition-colors hover:bg-blue-50/40"
                >
                  <td className="px-6 py-5">
                    <div className="font-semibold text-slate-700">
                      {new Date(
                        visit.visited_at
                      ).toLocaleDateString()}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      Time: {new Date(
                        visit.visited_at
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {visit.clinician_name?.charAt(0)}
                      </div>

                      <span className="font-semibold text-slate-800">
                        {visit.clinician_name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                        {visit.patient_name?.charAt(0)}
                      </div>

                      <span className="font-semibold text-slate-800">
                        {visit.patient_name}
                      </span>
                    </div>
                  </td>

                  <td className="max-w-xs px-6 py-5 text-sm text-slate-500">
                    {visit.notes || (
                      <span className="italic text-slate-400">
                        No notes added
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default VisitTable;