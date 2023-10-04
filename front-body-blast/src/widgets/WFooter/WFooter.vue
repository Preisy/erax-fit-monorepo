<script setup lang="ts">
import { SNavbar } from 'shared/ui/SNavbar';
import FooterNavLink from './FooterNavLink.vue'

const links = {}
</script>

<template>
    <div bg-bg>
        <SNavbar>
            <FooterNavLink />
        </SNavbar>
    </div>
</template>