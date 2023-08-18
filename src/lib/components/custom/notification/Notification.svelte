<svelte:options accessors />

<script>
  import { onMount } from "svelte";

  onMount(async () => {
    // getPermisson();
  });

  // let getPermisson = () => {
  //   if (!("Notification" in window)) {
  //     console.warn("This browser does not support notifications.");
  //   } else {
  //     Notification.requestPermission().then((permission) => {
  //       handlePermission(permission);
  //     });
  //   }
  // };

  const getPermisson = async () => {
    return new Promise((resolve, reject) => {
      if (!("Notification" in window)) {
        reject("This browser does not support notifications.");
      } else {
        Notification.requestPermission().then((permission) => {
          if (
            Notification.permission === "denied" ||
            Notification.permission === "default"
          ) {
            reject("The permission to show notifications is denied.")
            console.error("The permission to show notifications is denied.");
          } else {
            resolve(Notification.permission)
          }
        });
      }
    });
  };


  export let title = "Standard title";
  export let body = "Notification text :D!";
  export let icon = undefined;

  export const show = async (_title, _body, _icon) => {
    const result = await getPermisson();
    const n = new Notification(_title || title, {
      body: _body || body,
      icon: _icon || icon,
    });
  };
</script>
