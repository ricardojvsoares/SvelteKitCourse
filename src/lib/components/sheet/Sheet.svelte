<script lang="ts">
	import { cellToIndex, numberToAlphabet, type Cell } from './sheet-utils';

	let { data = $bindable([[]]) }: { data?: Cell[][] } = $props();
	let numRows = $derived(data.length > 10 ? data.length : 10);
	let numCols = $derived.by(() => {
		const largestRow = Math.max(...data.map((row) => row.length));
		return largestRow > 10 ? largestRow : 10;
	});
	let editedCell: string | null = $state(null);
	let selectedCel: string | null = $state(null);
	let selectedCelObject = $derived.by(() => {
		if (!selectedCel) return null;
		const [row, col] = selectedCel.split(',');

		return data[+row - 1]?.[+col - 1];
	});
	function init(el: HTMLInputElement) {
		el.focus();
	}
	function setCell(row: number, col: number, prop: 'value' | 'bgColor' | 'color', value: string) {
		if (data[row]) {
			if (data[row][col]) {
				data[row][col][prop] = value;
			} else {
				data[row] = [];
				data[row][col] = { [prop]: value };
			}
		} else {
			data[row] = [];
			data[row][col] = { [prop]: value };
		}
	}

	function parseValue(value: string | undefined): string | number {
		if (!value) return '';
		if (value.startsWith('=')) {
			const funcName = value.split('(')[0].substring(1);
			const args = value.replace(`=${funcName}`, '').replace(/[()]/g, '').split(',');
			const vals = args.map((arg) => {
				const cell = cellToIndex(arg);
				const val = data[cell.row - 1]?.[cell.col - 1]?.value;
				if (val?.startsWith('=')) return Number(parseValue(val));
				return val ? Number(val) : 0;
			});
			return vals.reduce(
				(prev, curr) => {
					if (funcName === 'SUM') return prev + curr;
					if (funcName === 'MULTIPLY') return prev * curr;
					return 0;
				},
				funcName === 'MULTIPLY' ? 1 : 0
			);
		} else return value;
	}
</script>

<h1>Sheets</h1>

{#if selectedCel}
	<br />
	<label for="bgColor">Background: </label>
	<input
		type="color"
		id="bgColor"
		value={selectedCelObject?.bgColor || '#0d1117'}
		oninput={(e) => {
			if (!selectedCel) return;
			const [row, col] = selectedCel?.split(',');
			setCell(+row - 1, +col - 1, 'bgColor', e.currentTarget.value);
		}}
	/>
	<label for="fontColor">Font: </label>
	<input
		type="color"
		id="fontColor"
		value={selectedCelObject?.color || '#0d1117'}
		oninput={(e) => {
			if (!selectedCel) return;
			const [row, col] = selectedCel?.split(',');
			setCell(+row - 1, +col - 1, 'color', e.currentTarget.value);
		}}
	/>
	<br />
{/if}
<table class="sheet">
	<tbody>
		{#each { length: numRows + 1 }, row}
			<tr>
				{#each { length: numCols + 1 }, col}
					{@const cellData = data[row - 1]?.[col - 1]}
					{@const currentCell = `${row}, ${col}`}
					<svelte:element
						this={row === 0 || col === 0 ? 'th' : 'td'}
						scope={row === 0 ? 'col' : col === 0 ? 'row' : undefined}
						role="button"
						tabindex="0"
						onclick={() => {
							if (currentCell === selectedCel || row === 0 || col === 0) return;
							selectedCel = currentCell;
						}}
						class:selected={selectedCel === currentCell}
						style:background-color={cellData?.bgColor}
						style:color={cellData?.color}
						ondblclick={() => {
							if (row === 0 || col === 0) return;
							editedCell = currentCell;
						}}
					>
						{#if row === 0 && col > 0}
							{numberToAlphabet(col)}
						{/if}
						{#if col === 0 && row > 0}
							{row}
						{/if}
						{#if row > 0 && col > 0}
							{#if editedCell !== currentCell}
								{parseValue(cellData?.value)}
							{:else}
								<input
									use:init
									type="text"
									value={cellData?.value || ''}
									style:background-color={cellData?.bgColor}
									style:color={cellData?.color}
									oninput={(e) => {
										setCell(row - 1, col - 1, 'value', e.currentTarget.value);
									}}
								/>
							{/if}
						{/if}
					</svelte:element>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	td.selected {
		outline: 2px solid rgb(26, 202, 255);
		outline-offset: -2px;
	}
</style>
