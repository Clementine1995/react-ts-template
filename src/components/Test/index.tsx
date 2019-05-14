import * as React from 'react'
import {Button} from 'antd'

@log
class Test extends React.Component {
  render () {
    return (
      <div>
        <p>this is a test component</p>
        <Button>点一哈，玩一年</Button>
      </div>
    )
  }
}

function log(target: any) {
  console.log(target)
}

export default Test