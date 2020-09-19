import React from 'react'

export default class ApiDataPopulatedTableRow extends React.Component {
    render() {
      const id = this.props.entryKeys[0]
      let columns = this.props.entryKeys.map( entryKey => <td key={entryKey+id}>{this.props.entry[entryKey]}</td>)
        return (
            <tr key={this.props.entry[id]} className="table-row">
                {columns}
            </tr>
        );
    }
}