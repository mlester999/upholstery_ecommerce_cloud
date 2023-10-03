export function applyPagination(documents, page, rowsPerPage) {
  if (!documents) return;
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
