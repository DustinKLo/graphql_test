import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="container">
				<h1>SpaceX</h1>
			</div>
		</ApolloProvider>
	);
}

export default App;
