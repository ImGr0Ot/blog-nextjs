export const validateSchema = (schema) => (req, res, next) => {
	try {
		schema.parse()
		next()
	} catch (error) {
		return res.status(400).json({ message: error.errors[0] })
	}
}
