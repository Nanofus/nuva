<span class="loader" />

<style lang="scss">
	@import '../style/variables.scss';
	.loader {
		width: 48px;
		height: 48px;
		display: inline-block;
		position: absolute;
		left: calc(50% - 24px);
		top: calc(50% - 24px);
		&:after,
		&:before {
			content: '';
			box-sizing: border-box;
			width: 48px;
			height: 48px;
			border-radius: 50%;
			background: var(--text-light);
			position: absolute;
			left: 0;
			top: 0;
			animation: animloader 2s linear infinite;
		}
		&:after {
			animation-delay: 1s;
		}
	}
	@keyframes animloader {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
	@media (prefers-color-scheme: dark) {
		.loader {
			&:after,
			&:before {
				background: var(--text-dark);
			}
		}
	}
</style>
