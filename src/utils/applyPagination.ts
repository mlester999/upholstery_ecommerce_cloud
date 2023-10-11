export function applyPagination(documents, page, rowsPerPage) {
  return documents
    .slice()
    .reverse()
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
