<template>
    <div class="upload">
        <form action="/api/img/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="avatar" id="avatar" value="" />
            <input type="hidden" name="path" value="avatar/"/>
            <input type="submit" value=""/>
        </form>
    </div>
</template>

<script>
</script>

<style>
</style>
