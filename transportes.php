<?php get_header(); ?>

<div class="container-fluid">
	<div class="container">
		<div class="row">
			<?php
			$args = array('post_type' => 'transportes');
			$loop = new WP_Query($args);

			if($loop->have_posts()) {
				while ($loop->have_posts()) { ?>
					<?php $loop->the_post(); ?>
						<div class="col-xs-12 col-sm-4">
						<?php the_post_thumbnail('post-thumbnail', ['class' => 'img-responsive']); ?>
				        <h2 class="font-700 font-1-5em text-uppercase"><?php the_title(); ?></h2>
				        <p class="line-height-1-7 font-1-1em"><?= get_the_content(); ?></p>
				    </div>
				<?php }
			}
			?>
		</div>
	</div>
</div>


<?php get_footer(); ?>
