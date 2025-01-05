<template>
  <div class="mt-8 flex relative lg:mt-0 lg:px-[calc(var(--section-gap)/2)] lg:pb-4">
    <i class="flex items-center justify-center w-8 h-8 text-[--color-text] lg:absolute lg:top-[calc(50%-25px)] lg:left-[-26px] lg:w-[50px] lg:h-[50px] lg:border lg:border-[--color-border] lg:bg-[--color-background] lg:rounded-lg">
      <slot name="icon" />
    </i>
    <div class="flex-1 ml-4">
      <h3 class="text-lg font-medium mb-1.5 text-[--color-heading]">
        <slot name="heading" />
      </h3>
      <slot />
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
