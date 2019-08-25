import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const LAUNCH_QUERY = gql`
	query LaunchQuery($flight_number: Int!) {
		launch(flight_number: $flight_number) {
			flight_number
			mission_name
			launch_year
			launch_success
			launch_date_local
			rocket {
				rocket_id
				rocket_name
				rocket_type
			}
		}
	}
`;

export default class Launch extends React.Component {
	render() {
		let flightNumber = this.props.match.params.flight_number;
		flightNumber = parseInt(flightNumber);

		return (
			<Fragment>
				<Query query={LAUNCH_QUERY} variables={{ flight_number: flightNumber }}>
					{({ loading, error, data }) => {
						if (loading) return <h4>loading...</h4>;
						if (error) console.log(error);

						const {
							mission_name,
							flight_number,
							launch_success,
							launch_date_local,
							launch_year,
							rocket,
						} = data.launch;
						return (
							<Fragment>
								<h1>
									Mission:&nbsp;
									<span style={{ color: launch_success === true ? 'green' : 'red' }}>
										{mission_name}
									</span>
								</h1>
								<ul className="list-group">
									<li className="list-group-item">Launch Success: {launch_success ? 'Yes' : 'No'}</li>
									<li className="list-group-item">Launch Year: {launch_year}</li>
									<li className="list-group-item">Launch Date: {launch_date_local}</li>
									<li className="list-group-item">Flight Number: {flight_number}</li>
									<li className="list-group-item">Rocket Details: {JSON.stringify(rocket)}</li>
								</ul>
								<br />
								<Link to="/" className="btn btn-secondary">
									Back
								</Link>
							</Fragment>
						);
					}}
				</Query>
			</Fragment>
		);
	}
}
