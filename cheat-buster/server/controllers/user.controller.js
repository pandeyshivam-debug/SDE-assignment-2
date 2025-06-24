import { z } from "zod"
import User from "../models/user.model.js"

const userEmailSchema = z.object({
    // email: z.string().nonempty("Email is required").email("Enter a valid email id")
    email: z.string().optional(),
    name: z.string().optional()
}).refine(data => {
    return data.email || data.name, {
        message: "Either email or name must be provided"
    }
})

const searchUser = async (req, res) => {
    const validationResult = userEmailSchema.safeParse(req.query)
    if(!validationResult.success) {
        return res.status(400).json({
            error: validationResult.error.issues[0].message
        })
    }

    const { email, name } = validationResult.data

    try {
        let foundUser
        // const foundUser = await User.findOne({email})
        if(email) {
            foundUser = await User.findOne({email})
        } else if(name) {
            foundUser = await User.findOne({
                $expr: {
                    $eq: [
                        { $toLower: { $concat: ["$firstName", " ", "$lastName"]}},
                        name.toLowerCase()
                    ]
                }
            })
        }
        if(!foundUser) {
            return res.status(404).json({
                message: "Phew! your partner is not on the list :)"
            })
        }
        return res.status(200).json(foundUser)
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error", details: err.message });

        // res.status(500).json({
        //     error: "Some error occured"
        // })
    }
}

export default searchUser