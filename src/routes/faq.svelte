<script lang="ts">
	import TocEntry from '$lib/components/TOCEntry.svelte';
	import Answer from '$lib/components/answer.svelte';
	import Question from '$lib/components/question.svelte';
	import XLink from '$lib/components/ExternalLink.svelte';
</script>

<div class="flex h-screen w-screen justify-between">
	<div class="w-1/3 pl-24 pr-8 pt-12 ">
		<h3 class="text-xl mb-4">Table of Contents</h3>
		<ul>
			<TocEntry text="What is existential risk?" href="#what-is-x-risk" />
			<TocEntry text="Is humanity dying out so bad?" href="#so-bad" />
			<TocEntry text="How can I help with existential risk?" href="#help" />
			<TocEntry text="Are the numbers you use real?" href="#numbers" />
			<TocEntry
				text="This is really great, I now think humanity will probably survive!"
				href="#this-is-great"
			/>
			<TocEntry text="This is really gloomy!" href="#this-is-gloomy" />
			<TocEntry text="Who made this?" href="#who-made-this" />
			<TocEntry text="Can I see the code?" href="#can-i-see" />
			<li><a class="font-bold text-lg" href="/" sveltekit:prefetch>Return to tree</a></li>
		</ul>
	</div>
	<div class="w-2/3 py-12 flex justify-center overflow-y-scroll">
		<article class="prose w-full  ">
			<Question id="what-is-x-risk">What is existential risk?</Question>
			<Answer
				>Existential risk is the possibility of all of humanity dying out. This could look like an
				engineered disease, or artificial intelligence, or something we haven't foreseen.</Answer
			>

			<Question id="so-bad"
				>Is humanity dying out so bad? We've done a lot of damage to the earth.</Question
			>
			<Answer
				>In the abstract, it can sound less menacing. In reality, this would mean everybody you love
				dying. Furthermore, it means the loss of humanity's long-term potential. In the future, we
				could engineer the world to be better for all forms of life. If we die now, we lose our
				chance to try.
			</Answer>

			<Question id="help">How can I help with existential risk?</Question>
			<Answer
				><ul>
					<li>
						You can work on a <XLink
							href="https://80000hours.org/articles/how-to-reduce-existential-risk/#get-started"
							>career</XLink
						> in researching and mitigating existential risk.
					</li>
					<li>You can donate to organizations doing the above.</li>
					<li>
						You can pressure your representative to fund <XLink
							href="https://twitter.com/csercambridge/status/1231693809442074624?lang=en"
							>chronically underfunded x-risk insitutitions</XLink
						>.
					</li>
				</ul></Answer
			>

			<Question id="numbers">Are the numbers you use real?</Question>
			<Answer
				>Yes and no. They are averages of predictions from the forecasting site Metaculus. Popular
				predictions in the media are often unquantified. The Metaculus numbers are 'best guesses'
				from forecasters and are a step up over simultaneously certain and unspecified predictions.
			</Answer>
			<Answer>
				However, the Metaculus predictions are probably biased to be optimistic, because forecasters
				can safely predict that humanity will survive: points won't matter if everybody dies. See
				this comment <XLink
					href="https://forum.effectivealtruism.org/posts/27aXsJRRAoNZFw9K3/some-global-catastrophic-risk-estimates?commentId=c72ZbLJ5hLRzoFJTZ"
					>here</XLink
				> for more.
			</Answer>
			<Answer
				>Better numbers could come from domain experts. Even better numbers could come from
				<XLink
					href="https://forum.effectivealtruism.org/posts/W8dpCJGkwrwn7BfLk/nuclear-expert-comment-on-samotsvety-nuclear-risk-forecast-2"
					>'adversarial collaboration'</XLink
				>
				between general forecasters and domain experts. We are happy to include alternative datasets
				on the site from experts, or from famous predictions.
			</Answer>

			<Question id="this-is-great"
				>This is really great, I now think humanity will probably survive!</Question
			>
			<Answer
				>That's awesome! The creator of this site agrees. However, humanity dying out is so bad,
				that it's still worth working on reducing its chances. A 1% chance of billions of people
				dying is too high.</Answer
			>

			<Question id="this-is-gloomy">This is really gloomy!</Question>
			<Answer
				>It can be! One thing that can help is to imagine the potential behind all the futures where
				we survive. There's a good chance that we don't merely survive, but flourish.</Answer
			>

			<Question id="who-made-this">Who made this?</Question>
			<Answer
				><XLink href="https://conorbarnes.com/">Conor Barnes</XLink>
				made this with funding provided by the
				<XLink href="https://funds.effectivealtruism.org/funds/far-future"
					>Long-Term Future Fund</XLink
				>. Predictions are pulled from
				<XLink href="https://www.metaculus.com/">Metaculus</XLink>.</Answer
			>
			<Question id="can-i-see">Can I see the code?</Question>
			<Answer>Yes, <XLink href="https://github.com/ideopunk/x-risk-tree">right here</XLink>.</Answer>
			<Answer>
				{' '}The tree is based on Mike Bostock's Radial Tidy Tree layout (Copyright 2022 Observable,
				Inc. Released under the ISC license.
				<XLink href="https://observablehq.com/@d3/radial-tree"
					>https://observablehq.com/@d3/radial-tree</XLink
				>)</Answer
			>
			<div class="h-12" id="hack" />
		</article>
	</div>
</div>
