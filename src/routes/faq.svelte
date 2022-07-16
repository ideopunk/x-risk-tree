<script lang="ts">
	import TocEntry from '$lib/components/TOCEntry.svelte';
	import Answer from '$lib/components/answer.svelte';
	import Question from '$lib/components/question.svelte';
	import XLink from '$lib/components/ExternalLink.svelte';
	import InternalLink from '$lib/components/InternalLink.svelte';
</script>

<div class="flex flex-col lg:flex-row px-8 lg:px-0  w-screen justify-between relative">
	<div class="flex justify-center lg:w-1/3 ">
		<div class="w-[65ch] lg:w-1/3 pl-0 lg:pl-24 pr-8 mt-8 left-0 top-0 h-min lg:fixed ">
			<h3 class="text-xl mb-4">Table of Contents</h3>
			<ul>
				<TocEntry text="What is existential risk?" href="#what-is-x-risk" />
				<TocEntry text="Is humanity dying out so bad?" href="#so-bad" />
				<TocEntry text="How can I help with existential risk?" href="#help" />
				<TocEntry text="What do the colors mean?" href="#colors" />
				<TocEntry text="Are the numbers you use real?" href="#numbers" />
				<TocEntry
					text="This is really great, I now think humanity will probably survive!"
					href="#this-is-great"
				/>
				<TocEntry text="This is really gloomy!" href="#this-is-gloomy" />
				<TocEntry text="Who made this?" href="#who-made-this" />
				<TocEntry text="Can I see the code?" href="#can-i-see" />
				<TocEntry text="Further Reading" href="#resources" />

				<li class="text-xl mt-6"><InternalLink href="/">Home</InternalLink></li>
				<li class="text-xl mt-2"><InternalLink href="collection">Collection</InternalLink></li>
			</ul>
		</div>
	</div>
	<div class="lg:w-2/3 pb-12  flex justify-center ">
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
				dying, everybody you know dying, all children dying, etc. This is a future worth avoiding!
				Furthermore, it means the loss of humanity's long-term potential. In the future, we could
				engineer the world to be better for all forms of life. If we die now, we lose our chance to
				try.
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

			<Question id="colors">What do the colors mean?</Question>
			<Answer>
				<ul>
					<li>
						<span class="font-bold text-green-forest">Green</span> branches are ones where humans do
						not suffer a catastrophe in the next 100 years (per this <XLink
							href="https://www.metaculus.com/questions/1493/ragnar%25C3%25B6k-question-series-by-2100-will-the-human-population-decrease-by-at-least-10-during-any-period-of-5-years/"
							>Metaculus question</XLink
						>).
					</li>
					<li>
						<span class="font-bold text-red-500">Red</span> branches are ones where humans suffer a catastrophe
						in the next 100 years.
					</li>
					<li>
						<span class="font-bold text-black">Black</span> branches are ones where humans suffer a near-extinction
						event in the next 100 years.
					</li>
					<li>
						<span class="underline">'Catastrophes'</span> are defined as events that reduce the human
						population by at least 10%.
					</li>
					<li>
						<span class="underline">'Near-extinction events'</span> are defined as events that reduce
						the human population by at least 95%.
					</li>
				</ul>
			</Answer>

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
				on the site from experts, or from famous predictions in our <InternalLink href="/collection"
					>collection</InternalLink
				>, which has started with data from Michael Aird's <XLink
					href="https://docs.google.com/spreadsheets/d/1W10B6NJjicD8O0STPiT3tNV3oFnT8YsfjmtYR8RO_RI/edit#gid=0"
					>Database of existential risk estimates</XLink
				>.
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
				>It can be! One thing that can help is to keep in mind the potential behind all the futures
				where we survive. A recent <XLink href="https://www.youtube.com/watch?v=LEENEFaVUzU"
					>video from Kurzgesagt</XLink
				>
				does a great job of illustrating that potential.
			</Answer>

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
			<Answer>Yes, <XLink href="https://github.com/ideopunk/x-risk-tree">right here</XLink>.</Answer
			>
			<Answer>
				{' '}The tree is based on Mike Bostock's Radial Tidy Tree layout (Copyright 2022 Observable,
				Inc. Released under the ISC license.
				<XLink href="https://observablehq.com/@d3/radial-tree"
					>https://observablehq.com/@d3/radial-tree</XLink
				>)</Answer
			>
			<Question id="resources">Further Reading</Question>
			<Answer>
				<ul>
					<li>
						80,000 Hours (2020){' '}
						<XLink href="https://80000hours.org/2020/04/longtermist-policy-ideas/">
							Policy and research ideas to reduce existential risk.
						</XLink>
					</li>
					<li>
						<XLink href="https://forum.effectivealtruism.org/topics/existential-risk"
							>Existential Risk</XLink
						>, Effective Altruism Forum - Topics.
					</li>
					<li>
						Bostrom, Nick (2002){' '}
						<XLink href="https://www.jetpress.org/volume9/risks.html"
							>Existential risks: analyzing human extinction scenarios and related hazards</XLink
						>, Journal of Evolution and Technology, vol. 9.
					</li>
					<li>
						MichaelA (2020){' '}
						<XLink
							href="https://forum.effectivealtruism.org/posts/JQQAQrunyGGhzE23a/database-of-existential-risk-estimates"
						>
							Database of existential risk estimates
						</XLink>, Effective Altruism Forum.
					</li>
				</ul>
			</Answer>
			<div class="h-12" id="hack" />
		</article>
	</div>
</div>
