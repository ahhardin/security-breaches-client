import React from "react"
import './App.css';
import Form from './components/Form'
import Results from './components/Results'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breachedAccounts: [],
      unfilteredBreachedAccounts: [],
      breachedAccountsFetched: false,
      errors: [],
      ordered: {},
      searchType: "Name"
    }
  }

  setSearchType(value) {
    this.setState({searchType: value})
  }

  search(value) {
    if (value) {
      const breachedAccounts = this.state.breachedAccounts.filter(ba => {
        if (this.state.searchType === 'DataClasses') {
          return ba[this.state.searchType].filter(d => {
            return d.toLowerCase().search(value) !== -1
          }).length
        } else {
          return ba[this.state.searchType].toLowerCase().search(value) !== -1
        }

      })
      this.setState({breachedAccounts})
    } else {
      this.setState({breachedAccounts: this.state.unfilteredBreachedAccounts})
    }
  }

  restart() {
    this.setState({breachedAccountsFetched: false})
  }

  reorder(order, orderBy) {
    const comparator = this.getComparator(order, orderBy)
    const breachedAccounts = this.state.breachedAccounts.sort(comparator)
    this.setState({breachedAccounts, ordered: {orderBy, order}})
  }

  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => this.descendingComparator(a, b, orderBy)
        : (a, b) => -this.descendingComparator(a, b, orderBy);
  }

  fetchResults(email) {
    if (email) {
      if (this.validateEmail(email)) {
        const url = new URL(`http://localhost:3000/breaches?email=${email}`)
        fetch(url).then(res => res.json()).then(data => {
          const breachedAccounts = data
          this.setState({breachedAccounts, unfilteredBreachedAccounts: breachedAccounts, breachedAccountsFetched: true})
        }).catch(e => this.setState({errors: ["Something went wrong. Try again later", e]}))
      } else {
        this.setState({errors: ["You must enter a valid email address"]})
      }
    } else {
      this.setState({errors: ["You must enter an email address"]})
    }
  }

  validateEmail(email) {
    const pattern = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')
    return pattern.test(email.toLowerCase())
  }

  render() {
    return (
      <div className="App">
        {this.state.breachedAccountsFetched ? (
          <Results 
            breachedAccounts={this.state.breachedAccounts}
            restart={this.restart.bind(this)}
            reorder={this.reorder.bind(this)}
            ordered={this.state.ordered}
            search={this.search.bind(this)}
            setSearchType={this.setSearchType.bind(this)}>
          </Results>
        ) : (
          <Form fetchResults={this.fetchResults.bind(this)} errors={this.state.errors}></Form>
        )}
      </div>
    );
  }

}

export default App;
