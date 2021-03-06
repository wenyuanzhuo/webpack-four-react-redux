import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import { connect } from 'react-redux';
import { getCurrentUser } from 'action/user'
const FormItem = Form.Item;
const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  return {
    user: state.user.get('user')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}
@withRouter
@Form.create()
@connect(mapStateToProps, mapDispatchToProps)
class Login extends React.Component {
  state = {
    count: 0,
    type: 'account',
  }
  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { getCurrentUser, history } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        return getCurrentUser()
          .then((res) => {      
            if( res.username === values.userName
              && Number(res.password) === Number(values.password)) {
                history.push('/dashboard/overview')
              }
          })
      }
    });
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { count, type } = this.state;
    return ( 
      <div className="user-login">
        <Form onSubmit={this.handleSubmit}>
          <Tabs animated={false} className="tabs" activeKey={type} onChange={this.onSwitch}>
            <TabPane tab="账户密码登录" key="account">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{
                    required: type === 'account', message: '请输入账户名！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className="prefixIcon" />}
                    placeholder="admin"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: type === 'account', message: '请输入密码！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className="prefixIcon" />}
                    type="password"
                    placeholder="888888"
                  />
                )}
              </FormItem>
            </TabPane>
            <TabPane tab="手机号登录" key="mobile">        
              <FormItem>
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: type === 'mobile', message: '请输入手机号！',
                  }, {
                    pattern: /^1\d{10}$/, message: '手机号格式错误！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="mobile" className="prefixIcon" />}
                    placeholder="手机号"
                  />
                )}
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captcha', {
                      rules: [{
                        required: type === 'mobile', message: '请输入验证码！',
                      }],
                    })(
                      <Input
                        size="large"
                        prefix={<Icon type="mail" className="prefixIcon" />}
                        placeholder="验证码"
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <Button
                      disabled={count}
                      className="getCaptcha"
                      size="large"
                      onClick={this.onGetCaptcha}
                    >
                      {count ? `${count} s` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem className="additional">
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox className="autoLogin">自动登录</Checkbox>
            )}
            <a className="forgot" href="">忘记密码</a>
            <Button size="large" loading={false} className="submit" type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </Form>
        <div className="other">
          其他登录方式
          {/* 需要加到 Icon 中 */}
          <span className="iconAlipay" />
          <span className="iconTaobao" />
          <span className="iconWeibo" />
          <Link className="register" to="/user/register">注册账户</Link>
        </div>
      </div>
    )
  }
}

export default Login