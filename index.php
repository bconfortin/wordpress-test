<?php get_header(); ?>

<div class="container-fluid">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-8">
				<?php
				if(have_posts()) {
				    while(have_posts()) { ?>

				    	<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('post-thumbnail', ['class' => 'img-responsive']); ?></a>
				        <?php the_post(); ?>
				        <h2 class="font-700 font-1-5em text-uppercase"><?php the_title(); ?></h2>
				        <p class="line-height-1-7 font-1-1em"><?= get_the_content(); ?></p>

				    <?php }
				}
				?>

				<?php

				$args = array('post_type' => 'transportes');
				$loop = new WP_Query($args);

				if($loop->have_posts()) {
					while ($loop->have_posts()) { ?>
						<?php $loop->the_post(); ?>
						<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('post-thumbnail', ['class' => 'img-responsive']); ?></a>
				        <h2 class="font-700 font-1-5em text-uppercase"><?php the_title(); ?></h2>
				        <p class="line-height-1-7 font-1-1em"><?= get_the_content(); ?></p>
					<?php }
				}
				?>
			</div>
			<div class="col-xs-12 col-sm-4">

			</div>
		</div>
	</div>
</div>


<?php get_footer(); ?>
