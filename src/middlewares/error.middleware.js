export function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((errorItem) => errorItem.message)
      .join(", ");

    return res.status(400).json({ error: { message } });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: { message: "Invalid id format" } });
  }

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ error: { message } });
}
