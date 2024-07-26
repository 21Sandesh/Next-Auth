import { authOptions } from "../../../lib/auth";
import { getServerSession } from 'next-auth';

const Dashboard = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        return <h2>Dashboard Page, Welcome {session.user.username}</h2>
    }
    return (
        <h2>Please Login</h2>
    )
}

export default Dashboard;