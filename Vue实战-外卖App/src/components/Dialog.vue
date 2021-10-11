<template>
    <div class="dialog">
		{{message}}
	</div>
</template>

<script>
	import{reactive,toRefs} from "vue"
    export default {
        name: "Dialog",
		props:["message"]
    }
	export const useDialogEffect = ()=>{
		const DialogData = reactive({
			show:false,
			toMassage:""
		});
		//单独调用
		const showDialog =(message)=>{
			DialogData.show = true;
			DialogData.toMassage = message;
			setTimeout(()=>{
				DialogData.show = false;
				DialogData.toMassage ="";
			},3000);
		}
		const {show,toMassage} = toRefs(DialogData)
		return {
			show,toMassage,showDialog 
		}	 
	}
	
</script>

<style scoped>
	.dialog{
		position: fixed;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		padding:.2rem;
		border-radius: .05rem;
		color:#fff;
		background-color: rgba(0,0,0,.3);
	}
</style>
