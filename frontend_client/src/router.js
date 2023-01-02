import HomePage from "./page/HomePage/HomePage";
import AllJob from './page/PageAllJob/AllJob';
import PageRecruiter from "./page/PageRecruiter/PageRecruiter";
import RecruiterInfo from './page/PageRecruiterInfo/RecruiterInfo';
import JobInfo from './page/PageJobInfo/JobInfo';
import JoInfoRecruiter from './PageRecruiter/PageJobInfo/JobInfo'
import PageLogin from "./page/PageLogin/index";
import PageRegister from './page/PageRegister';
import PageLoginRecruiter from "./PageRecruiter/PageLogin/index";
import PageRegisterREcruiter from "./PageRecruiter/PageRegister/index";
import ProfileUser from './page/PageProfileUser/index';
import ProfileRecruiter from "./page/PageProfileRecruiter/index";
import PageHomeRecruiter from "./PageRecruiter/HomePage/index";
import PostJob from "./PageRecruiter/PostJob/index";
import UserApplyJob from "./PageRecruiter/pageUserApplyJob/UserApplyJob";
import PageNotFound from "./PageNotFound/index";
import SuggestJob from "./page/SuggestJob/Suggest";
import UpdateJobItem from "./PageRecruiter/UpdateItemJob/index"

const routes = [
    {
        path: '/',
        exact: true,
        main: HomePage
    },
    {
        path: '/tatcacongviec',
        exact: true,
        main: AllJob
    },
    {
        path: '/nhatuyendung',
        exact: true,
        main: PageRecruiter
    },
    {
        path: '/job/:id',
        exact: false,
        main: JobInfo
    },
    {
        path: '/job-recruiter/:id',
        exact: false,
        main: JoInfoRecruiter
    },
    {
        path: '/recruiter/:id',
        exact: false,
        main: RecruiterInfo
    },
    {
        path: '/login',
        exact: false,
        main: PageLogin
    },
    {
        path: '/register',
        exact: false,
        main: PageRegister
    },
    {
        path: '/login-recruiter',
        exact: false,
        main: PageLoginRecruiter
    },
    {
        path: '/register-recruiter',
        exact: false,
        main: PageRegisterREcruiter
    },
    {
        path: '/profile-user',
        exact: false,
        main: ProfileUser
    },
    {
        path: '/profile-recruiter',
        exact: false,
        main: ProfileRecruiter
    },
    {
        path: '/trang-nha-tuyen-dung',
        exact: false,
        main:  PageHomeRecruiter
    },
    {
        path: '/dang-cong-viec',
        exact: false,
        main:  PostJob
    },
    {
        path: '/404-not-found',
        exact: false,
        main:  PageNotFound
    },
    {
        path: '/user-apply-job',
        exact: false,
        main:  UserApplyJob
    },
    {
        path: '/goi-y-cong-viec',
        exact: false,
        main:  SuggestJob
    },
    {
        path: '/chinh-sua-cong-viec',
        exact: false,
        main: UpdateJobItem
    }
];

export default routes;
