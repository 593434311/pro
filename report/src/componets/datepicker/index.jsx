import { DatePicker } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { RangePicker } = DatePicker;

class ControlledRangePicker extends React.Component {
  state = {
    mode: ['month', 'month'],
    value: [],
  };

  handlePanelChange = (value, mode) => {
    this.setState({
      value,
      mode: [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ],
    });
  }

  render() {
    const { value, mode } = this.state;
    return (
      <RangePicker
        placeholder={['开始月份', '截止月份']}
        format="YYYY-MM"
        value={value}
        mode={mode}
        onPanelChange={this.handlePanelChange}
      />
    );
  }
}

export default ControlledRangePicker;