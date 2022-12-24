import axios from 'axios'

export const getChatUsers = async () => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
    return data.map(d => {
        return {
            chatId: d.id,
            name: d.username,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0luq0mPWlgaA4UpezZkeROrrW0NMUAkqmhzNCmK5ZtqoiqoZJv5euTP-hVpbUO4HZ1M&usqp=CAU'
        }
    })
}