import { BackTop, Layout } from 'antd';
import React from 'react';

const { Content } = Layout;

interface stateProps {
  component: any;
}
class Template extends React.Component<stateProps,any>{
  wrapper: any;
  constructor(props: any) {
    super(props);

    this.wrapper = React.createRef();
  }

  render() {
    return (
      <Layout>
        <Layout >
          <Content  >
            <div ref={this.wrapper}>
              {this.props.children}
            </div>
            <BackTop />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Template;
