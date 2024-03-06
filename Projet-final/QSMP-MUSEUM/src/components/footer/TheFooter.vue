<script lang="ts" setup>
import "@/assets/blocks/dirt.png";
</script>

<template>
	<div class="pre-footer-background"></div>
	<div class="p-3 text-dark-emphasis footer-background">
		<div class="container">
			<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
				<div class="col-md-4 d-flex align-items-center">
					<p> Made with <img src="@/assets/item/full_heart.png" class="heart"> by <a v-bind:href="'https://github.com/Kaly-SH'" class="footer-link">Kaly</a></p>
				</div>
				<div class="nav col-md-4 justify-content-end list-unstyled d-flex">
					<p class="">
						Powered by
						<a class="footer-link" v-bind:href="'https://vuejs.org/'">
							Vue.js
						</a>
					</p>
				</div>
			</footer>
		</div>
	</div>	
</template>

<style
	lang="scss"
	scoped
>
@import url('https://fonts.cdnfonts.com/css/minecraft-4');

.pre-footer-background {
	background: url(@/assets/blocks/grass_block_side.png);
	background-repeat: repeat;
	background-size: 64px 64px;
	image-rendering: pixelated;
	height: 64px;
	box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.25);
}
.footer-background {
	background: url(@/assets/blocks/dirt.png);
	background-repeat: repeat;
	background-size: 64px 64px;
	image-rendering: pixelated;
}


footer {
	font-family: 'Minecraft';
	color: white;
	font-size: larger;
	text-shadow: 1px 1px 2px black;
}

.heart {
	width: 32px;
	height: 32px;
	image-rendering: pixelated;
	display: inline-block;
	filter: drop-shadow(1px 1px 2px black);
}

.footer-link {
	color: white;
}

</style>