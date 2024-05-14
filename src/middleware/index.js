
export async function errorhandler(
  err,
  req,
  res,
  next
) {
  console.error("ErrorHandler | Error: ", err.stack);
  res.status(500).send({ error: "Something Went Wrong!" });
}

