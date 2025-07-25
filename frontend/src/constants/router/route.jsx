import UserListPage from "../../pages/UserListPage";
import CreateUserPage from "../../pages/CreateUserPage";
import Layout from "../../components/Layout";

export const ROUTES = [
    {
        path: '/',
        element: (
            <Layout>
                <UserListPage/>
            </Layout>
        ),
    },
    {
        path: '/create',
        element: (
            <Layout>
                <CreateUserPage/>
            </Layout>
        ),
    }
];