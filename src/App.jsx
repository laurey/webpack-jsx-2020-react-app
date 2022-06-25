import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import GlobalHeader from '@/components/GlobalHeader';
import NotMatch from '@/components/NotMatch';
import Loading from '@/components/Loading';
import Home from './pages/Home';
import Counter from './pages/Counter';
import Topics from './pages/Topics';
import Posts from './pages/Posts';
import Users from './pages/Users';
// import About from './pages/About';
import Contact from './pages/Contact';
import CommentsPage from './pages/Comments';
import RateControl from './pages/RateControl';
import Demos from './pages/Demos';
import Dashboard from './pages/Dashboard';
import DashboardLazy from './pages/DashboardLazy';

const About = React.lazy(() => import(/* webpackChunkName: "about" */ './pages/About'));

const { Content, Footer } = Layout;

const App = () => {
    return (
        <Layout className="layout">
            <GlobalHeader />
            <Content>
                <div
                    style={{
                        margin: 24,
                        padding: 24,
                        background: '#fff',
                        minHeight: `calc(100vh - 8rem)`
                    }}
                >
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/posts" component={Posts} />
                            <Route path="/users" component={Users} />
                            <Route path="/demos" component={Demos} />
                            <Route path="/topics" component={Topics} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/counter" component={Counter} />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/lazyDash" component={DashboardLazy} />
                            <Route path="/comments" component={CommentsPage} />
                            <Route path="/rateControl" component={RateControl} />
                            <Route component={NotMatch} />
                        </Switch>
                    </Suspense>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Footer Content &copy;2020</Footer>
        </Layout>
    );
};

export default App;
