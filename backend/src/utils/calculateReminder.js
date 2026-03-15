// utils/calculateReminder.js
export function calculateReminder(deadline, minutesBefore) {
  if (!deadline || minutesBefore == null) return null; // só retorna null se undefined ou null

  const deadlineDate = new Date(deadline);
  return new Date(deadlineDate.getTime() - minutesBefore * 60 * 1000);
}
