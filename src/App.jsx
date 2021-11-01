import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import GlobalHeader from '@/components/GlobalHeader';
import NotMatch from '@/components/NotMatch';
import Home from './pages/Home';
import Counter from './pages/Counter';
import Topics from './pages/Topics';
import Posts from './pages/Posts';
import Users from './pages/Users';
import RateControl from './pages/RateControl';

const { Content, Footer } = Layout;

export class App extends PureComponent {
    render() {
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
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/topics" component={Topics} />
                            <Route path="/posts" component={Posts} />
                            <Route path="/users" component={Users} />
                            <Route path="/counter" component={Counter} />
                            <Route path="/rateControl" component={RateControl} />
                            <Route component={NotMatch} />
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Footer Content &copy;2021</Footer>
            </Layout>
        );
    }
}

export default App;
