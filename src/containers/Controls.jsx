import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getColumns, getRows, isPlaying } from '../reducers/grid';
import Input from '../components/Input';
import InputNumber from '../components/InputNumber';
import Button from '../components/Button';
import { changeRows, changeColumns, togglePlay } from '../actions/actions';

const enhance = connect(
  store => ({
    rows: getRows(store),
    columns: getColumns(store),
    isPlaying: isPlaying(store)
  }),
  {
    changeRows,
    changeColumns,
    togglePlay
  }
);

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: props.rows,
      columns: props.columns
    };
  }

  onChangeRows = rows => this.props.changeRows(rows);
  onChangeColumns = columns => this.props.changeColumns(columns);
  onTogglePlay = on => this.props.togglePlay(on);

  render() {
    return (
      <div className="controls">
        <InputNumber
          label="Rows"
          value={this.props.rows}
          onChange={this.onChangeRows}
        />

        <InputNumber
          label="Columns"
          value={this.props.columns}
          onChange={this.onChangeColumns}
        />

        <InputNumber value={25} label="size" />

        <Input value="red" type="text" label="Color" />

        <Button
          activeLabel="on"
          inActiveLabel="off"
          isActive={this.props.isPlaying}
          onClick={this.onTogglePlay}
        />
      </div>
    );
  }
}

export default enhance(Controls);
