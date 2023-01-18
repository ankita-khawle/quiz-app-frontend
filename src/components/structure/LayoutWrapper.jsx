import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import { Layout } from 'antd'
import '../../style.scss'
import { Row, Card, Col, Switch, Button, Input, Steps, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getQuestions } from '../../redux/quiz/quiz.action'
import { Form } from 'antd'
import sha1 from 'sha1'

const { Content } = Layout

const LayoutWrapper = (props) => {
  // const { questionList } = useSelector((state) => state.quizReducer)
  const questionList = [
    {
      answerSha1: '5c8452354c261b52e6dcf7f94b80ea5a7bceb677',
      question:
        "What do people mean when type the letters 'SMH' in a message on the internet?",
    },
    {
      answerSha1: '088e4a2e6f0c20048cd3e53c639c7092bffb8524',
      question:
        "Which country's flag can be described as 'Green with a vertical white band on the left side. The green section contains a white crescent and star.'?",
    },
    {
      answerSha1: 'b79445b10bd5bc34cbebf63355101dbdb420aa0e',
      question: 'Which director directed Gangs of New York?',
    },
    {
      answerSha1: 'fd26fb6ff5aa10eaddad0b2c832139dbe052c9d7',
      question:
        "Which philosopher famously said 'This is patently absurd; but whoever wishes to become a philosopher must learn not to be frightened by absurdities'?",
    },
    {
      answerSha1: 'e8002c169040af08d8b4ed2f0d636b840f335f9b',
      question: 'What is Xylology the study of?',
    },
  ]

  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [items, setItems] = useState([])

  const [attempts, setAttempts] = useState(3)
  const [current, setCurrent] = useState(0)
  const [mode, setMode] = useState(0)
  const [score, setScore] = useState(0)

  const next = () => {
    let str = sha1(form.getFieldValue('answer').toLowerCase())
    if (questionList[current].answerSha1 === str) {
      setCurrent(current + 1)
      setScore(score + 1)
      form.setFieldValue('answer', null)
    } else {
      if (attempts === 1) {
        alert('Quiz Finished')
        setAttempts(0)
      } else {
        setAttempts(attempts - 1)
      }
    }
  }
  const resetQuiz = () => {
    // dispatch(getQuestions())
    setAttempts(3)
    setScore(0)
    setCurrent(0)
  }

  const onModeChange = (data) => {
    console.log(data)
    setMode(data ? 1 : 0)
  }

  useEffect(() => {
    if (!questionList) {
      // dispatch(getQuestions())
    } else {
      console.log(questionList)
      let buff = questionList.map((item) => ({
        key: item.title,
        title: item.title,
      }))
      setItems(buff)
    }
    //questionList, dispatch, attempts
  }, [])

  return (
    <Layout className="site-layout">
      <Content className={!mode ? 'content-light' : 'content-dark'}>
        {attempts > 0 ? (
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

                  <div
                    style={{
                      marginTop: 24,
                    }}
                  >
                    {current < questionList.length - 1 && (
                      <Button type="primary" onClick={() => next()}>
                        Next
                      </Button>
                    )}
                    {current === questionList.length - 1 && (
                      <Button
                        type="primary"
                        onClick={() => message.success('Processing complete!')}
                      >
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
        ) : (
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
        )}
      </Content>
    </Layout>
  )
}

export default memo(LayoutWrapper)
