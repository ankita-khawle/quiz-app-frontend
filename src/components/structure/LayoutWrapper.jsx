import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import { Layout } from 'antd'
import '../../style.scss'
import {
  Row,
  Card,
  Col,
  Switch,
  Button,
  Input,
  Steps,
  notification,
} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getQuestions } from '../../redux/quiz/quiz.action'
import { Form } from 'antd'
import sha1 from 'sha1'

const { Content } = Layout

const LayoutWrapper = (props) => {
  const { questionList } = useSelector((state) => state.quizReducer)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [items, setItems] = useState([])
  const [api, contextHolder] = notification.useNotification()

  const [attempts, setAttempts] = useState(3)
  const [done, setDone] = useState(false)
  const [current, setCurrent] = useState(0)
  const [mode, setMode] = useState(0)
  const [score, setScore] = useState(0)
  const openNotification = () => {
    api.error({
      message: 'Wrong Answer',
      description: 'Try Again',
      duration: 1,
    })
  }
  const openNotificationRestart = () => {
    api.info({
      message: 'Time for a new Quiz',
      description: '',
      duration: 1,
    })
  }
  const next = () => {
    if(form.getFieldValue('answer')) {
      let str = sha1(form.getFieldValue('answer').toLowerCase())
      if (questionList[current].answerSha1 === str) {
        setCurrent(current + 1)
        setScore(score + 1)
        form.setFieldValue('answer', null)
      } else {
        if (attempts === 1) {
          openNotificationRestart()
          setAttempts(0)
          setDone(true)
        } else {
          openNotification()
          setAttempts(attempts - 1)
        }
      }
    } else {
      form.validateFields(['answer'])
    }

  }
  const resetQuiz = () => {
    dispatch(getQuestions())
    setAttempts(3)
    setScore(0)
    setCurrent(0)
    setDone(false)
    form.setFieldValue('answer', null)
  }
  const finishQuiz = () => {
    setDone(true)
  }

  const onModeChange = (data) => {
    setMode(data ? 1 : 0)
  }

  useEffect(() => {
    dispatch(getQuestions())
  }, [])

  useEffect(() => {
    if (questionList && questionList.length) {
      let buff = questionList.map((item) => ({
        key: item.title,
        title: item.title,
      }))
      setItems(buff)
    }
  }, [questionList])
  return (
    <Layout className="site-layout">
      {contextHolder}
      <Content className={!mode ? 'content-light' : 'content-dark'}>
        {done ? (
          <Card className="base-card">
            <Row>
              <Col span={24}>
                <p className="attempt">
                  Attempts remaining: <span>{attempts}</span>{' '}
                </p>
              </Col>
              <Col span={24}>
                <p className="attempt">
                  Your Score: <span>{score}</span>{' '}
                </p>
              </Col>
              <Col span={10} />
              <Col span={4}>
                <Button
                  type="primary"
                  className="restartBtn"
                  onClick={() => resetQuiz()}
                >
                  Restart
                </Button>
              </Col>
              <Col span={10} />
            </Row>
          </Card>
        ): (
          <Card className="base-card">
            <Row>
              <Col span={24}>
                <p className="attempt">
                  Attempts remaining: <span>{attempts}</span>{' '}
                </p>
              </Col>
              <Col span={24}>
                <p className="score">
                  Your Score: <span>{score}</span>{' '}
                </p>
              </Col>
              <Col span={24}>
                <p className="mode">
                  Display Mode{' '}
                  <Switch
                    onChange={onModeChange}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                  />
                </p>{' '}
              </Col>
            </Row>
            {questionList && questionList.length ? (
              <Row>
                <Col span={6} />
                <Col span={12}>
                  <Steps
                    size="small"
                    className="stepStyle"
                    items={items}
                    current={current}
                  />
                  <Card className="contentStyle">
                    <p>Question: {current + 1}</p>
                    <p>{questionList[current].question}</p>
                    <Form form={form}>
                      <Form.Item
                        name="answer"
                        label="Answer"
                        rules={[
                          {
                            required: true,
                            message: 'Write some answer!',
                          },
                        ]}
                      >
                        <Input placeholder="Answer" />
                      </Form.Item>
                    </Form>
                  </Card>
                  <div className="btnBlockStyle">
                    {current < questionList.length - 1 && (
                      <Button type="primary"  onClick={() => next()}>
                        Next
                      </Button>
                    )}
                    {current === questionList.length - 1 && (
                      <Button type="primary" onClick={() => finishQuiz()}>
                        Done
                      </Button>
                    )}
                  </div>
                </Col>
                <Col span={6} />
              </Row>
            ) : (
              'Questions not loaded.'
            )}
          </Card>
        )}
      </Content>
    </Layout>
  )
}

export default memo(LayoutWrapper)
