import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

const COUNTRIES = [
    { country: "Italy", id: 0, visited: "Yes", year: "2012" },
    { country: "Japan", id: 1, visited: "No", year: "2023" },
    { country: "Chile", id: 2, visited: "No", year: "2025" },
];

const ADD_COUNTRY = "ADD_COUNTRY";

const addCountry = (country, visited, year) => {
    console.log(country, visited, year);
    return {
        type: ADD_COUNTRY,
        payload: {
            country,
            visited,
            year,
        },
    };
};

const Country = (props) => {
    console.log(props.country);
    return (
        <tr className="country">
            <td className="w-25 px-2 text-center">{props.country.country}</td>
            <td className="w-25 px-3 text-center">{props.country.visited}</td>
            <td className="w-25 px-3 text-center">{props.country.year}</td>
        </tr>
    );
};

const CountriesList = (props) => {
    console.log(
        props.countries.map((country) => {
            return country;
        })
    );
    return (
        <ul className="list-group">
            {props.countries.map((country) => (
                <li className="list-group-item" key={country.id}>
                    <Country country={country} />
                </li>
            ))}
        </ul>
    );
};

class AddCountry extends React.Component {
    constructor(props) {
        super(props);

        this.inputCountry = this.inputCountry;
        this.inputVisited = this.inputVisited;
        this.inputYear = this.inputYear;

        this.setTextInputRef = (inputElement) => {
            console.log(inputElement.value);

            switch (inputElement.id) {
                case "country":
                    this.inputCountry = inputElement;
                    break;

                case "visited":
                    this.inputVisited = inputElement;
                    break;

                case "year":
                    this.inputYear = inputElement;
                    break;
                default:
                    break;
            }
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCountry(
            this.inputCountry.value,
            this.inputVisited.value,
            this.inputYear.value
        );

        e.target.reset();
    };

    render() {
        return (
            <form className="mx-3" onSubmit={this.handleSubmit}>
                <label htmlFor="country">Country </label>
                <input
                    type="text"
                    id="country"
                    className="d-block mb-2"
                    ref={this.setTextInputRef}
                />
                <label htmlFor="visited"> Visited? </label>
                <input
                    type="text"
                    id="visited"
                    className="d-block mb-2"
                    ref={this.setTextInputRef}
                />
                <label htmlFor="year"> Year Visited/To Visit </label>
                <input
                    type="text"
                    id="year"
                    className="d-block mb-3"
                    ref={this.setTextInputRef}
                />
                <button type="submit"> Add Country </button>
            </form>
        );
    }
}

class Main extends React.Component {
    render() {
        return (
            <div className="p-3">
                <h1 className="text-danger">My Travel Plans</h1>
                <hr />
                <AddCountry addCountry={this.props.addCountry} />
                <hr />
                <div className="mx-2">
                    <th className="w-25 text-center">Country</th>
                    <th className="w-25 text-center">Visited</th>
                    <th className="w-25 text-center">Year</th>

                    <CountriesList countries={this.props.countries} />
                </div>
            </div>
        );
    }
}

const Reducer = (state = COUNTRIES, action) => {
    switch (action.type) {
        case ADD_COUNTRY:
            // console.log(state, action);
            let country = action.payload;
            country.id = state.length;
            return state.concat(country);

        default:
            return state;
    }
};

const store = createStore(Reducer, COUNTRIES);

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        countries: state,
    };
};

const mapDispatchToProps = (dispatch) => ({
    addCountry: (country, visited, year) =>
        dispatch(addCountry(country, visited, year)),
});

const AppExport = connect(mapStateToProps, mapDispatchToProps)(Main);

const App = () => {
    return (
        <Provider store={store}>
            <AppExport />
        </Provider>
    );
};

export default App;
