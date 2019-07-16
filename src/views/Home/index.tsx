/** @format */

import * as React from 'react'
import './index.scss'

import { Carousel } from 'antd'

interface IState {
  testRef: React.RefObject<Carousel>
}

class Home extends React.Component<{}, IState> {
  private testRef: React.RefObject<Carousel>
  constructor(props: any) {
    super(props)
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.testRef = React.createRef<Carousel>()
  }
  componentDidMount() {
    console.log(this.testRef.current!.innerSlider)

    window.setInterval(() => {
      this.testRef.current!.innerSlider.play()
    }, 500)
    // this.testRef.innerSlider.autoplayTimer = 5
  }
  render() {
    return (
      <div className="home">
        <p>Here is the Home page!!!</p>
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
