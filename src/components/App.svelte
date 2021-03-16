<script>
import { onMount } from 'svelte';
import Search from './Search.svelte';
import Row from './Row.svelte';

const API = 'https://jsonplaceholder.typicode.com/users';

let users = [];
let request;
let searchInput = '';

/**
 * Request data from backend on component first render
 */
onMount(() => {
	request = fetch(API)
		.then((response) => response.json())
		.then((data) => users = data);
});

/**
 * Update "searchInput" with the value received from the <Search /> component
 * @param event the captured event
 */
const handleSearch = (event) => searchInput = event.detail;

/**
 * Search the "userInput" value in the "name" or "username" fields of each user.
 * casing issues are fixed by lower-casing everything.
 */
const doSearch = (item) => {
	const input = searchInput.toLowerCase();
	const isName = item.name.toLowerCase().search(input) > -1;
	const isUser = item.username.toLowerCase().search(input) > -1;
	return isName || isUser;
}

/**
 * if "searchInput" has more than 0 characters
 * "filtered" will get his value by the filter function
 * otherwiser it will mirror the "users" value
 */
$: filtered = searchInput.length ? users.filter(doSearch) : users;
</script>

<main>
	<h1>Users Widget</h1>
	<Search on:searching={handleSearch} />
	{#await request}
		<p>Loading data from server...</p>
	{:then}
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Username</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				{#each filtered as item, index (item.id)}
					<Row 
						id={item.id} name={item.name} {index}
						username={item.username} email={item.email} 
					/>
				{/each}
			</tbody>
		</table>
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</main>

<style type="text/scss">
@import './../styles/main.scss';

main {
	text-align: center;
	padding: 1em;
	max-width: 240px;
	margin: 0 auto;
	font-family: sans-serif;

	h1 {
		color: $color;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	table {
		width: 100%;
		margin: 30px 0;
		border-collapse: collapse;
	}
}

@media (min-width: 640px) {
	main {
		max-width: none;
	}
}
</style>