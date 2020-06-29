/** @format */

import * as React from 'react'
import './index.scss'

import { Carousel, Button } from 'antd'

interface IState {
  testRef: React.RefObject<Carousel>
}

let timer: number | undefined = undefined

class Home extends React.Component<unknown, IState> {
  private testRef: React.RefObject<Carousel>
  constructor(props: unknown) {
    super(props)
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.testRef = React.createRef<Carousel>()
  }
  componentDidMount(): void {
    console.log(this.testRef.current!.innerSlider)

    timer = window.setInterval(() => {
      this.testRef.current!.innerSlider.play()
    }, 500)
    // this.testRef.innerSlider.autoplayTimer = 5
  }
  componentWillUnmount(): void {
    window.clearInterval(timer)
  }
  render(): JSX.Element {
    return (
      <div className="home">
        <p>Here is the Home page!!!</p>
        <Button>1234567</Button>
        <Carousel ref={this.testRef} dots>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default Home
