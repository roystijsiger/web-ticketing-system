<template>
    <div class="reaction">
        <h5>User id {{users_id}} wrote on {{create_date}}</h5>
        <div v-html="message"></div>
    </div>
</template>

<script>
    export default{
        props: ['message','create_date','modified_date','users_id','modified_users_id']
    }
</script>

<style scoped>
.reaction{
    margin-bottom: 10px;
    border: 1px solid #5FA6AA;
}
</style>