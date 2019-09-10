<!--
  Lime project
  File: AppLogo.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<template>
    <div class="logo">
        <router-link :to="{name: 'home'}" class="logo__link">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 52">
                <g fill="currentColor">
                    <path d="M3.4,48.9h26.2V52H0V17.1h3.4V48.9z"/>
                    <path d="M68,17.1h-3.4V52H68V17.1z"/>
                    <path d="M128.1,48.9L110,16.8h-3.4V52h3.4V22.6L126.4,52h3.4l16.4-29.4V52h3.4V16.8h-3.4L128.1,48.9z"/>
                    <path d="M187,48.9V36.1h33V33h-33V20.1h33v-3.1h-36.4V52H220v-3.1H187z"/>
                    <path d="M216.6,2V0L187,7.3v3.4L216.6,2z"/>
                </g>
            </svg>
        </router-link>
    </div>
</template>

<style lang="scss" src="../styles/components/AppLogo.scss"></style>
