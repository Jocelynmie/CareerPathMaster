export function isValidObjectId(id) {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
}

export function handleDatabaseError(error, operation) {
  console.error(`Database error during ${operation}:`, error);
  if (error.code === 11000) {
    throw new Error("Duplicate entry found");
  }
  throw new Error(`Database error during ${operation}`);
}
