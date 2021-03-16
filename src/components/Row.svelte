<script>
  export let id = '0';
  export let name = 'Sample User';
  export let username = 'sample';
  export let email = 'sample@user.com';
  export let index = -1;

  $: href = `mailto:${email}`;
  $: stringId = `user-${id}`;
</script>

<tr id={stringId} class={ (index % 2) ? 'striped' : '' }>
  <td>{name}</td>
  <td>{username}</td>
  <td><a {href}>{email}</a></td>
</tr>

<style type="text/scss">
@import './../styles/main.scss';

tr {
  height: 40px;

  &.striped {
    background-color: #eee;
  }

  td {
    a {
      color: $color;

      &:hover {
        color: darken($color, 15%);
      }
    }
  }
}

</style>