<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let txt = '';

  /**
   * Dispatch a custom event each time "txt" variable is modified
  */
  $: dispatch('searching', txt);
</script>

<form>
  <label for="search">Search user by name or username:</label>
  <input 
    type="text" id="search" name="search" 
    bind:value={txt} autocomplete="off"
  >
</form>