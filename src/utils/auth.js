import Auth from "@aws-amplify/auth"

export const signUp = async ({ username, password, phoneNumber, email, name }) => {
    try {
        if (!username || !password || !phoneNumber || !email) {
            throw new Error("Some values are missing")
        }

        const { user } = await Auth.signUp({
            username, password, attributes: {
                name,
                email, phone_number: phoneNumber
            }
        })

        return user
    } catch (error) {
        console.log('Error signing up', error)
    }
}