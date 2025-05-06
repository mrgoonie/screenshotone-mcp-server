import { Command } from 'commander';
import { Logger } from '../utils/logger.util.js';
import screenshotOneController from '../controllers/screenshotone.controller.js';
import { handleCliError } from '../utils/error.util.js';
import { config } from '../utils/config.util.js';

/**
 * Register ScreenshotOne CLI commands
 * @param program The Commander program instance
 */
function register(program: Command) {
	const cliLogger = Logger.forContext('cli/screenshotone.cli.ts', 'register');
	cliLogger.debug(`Registering ScreenshotOne CLI commands...`);

	// Take Screenshot Command
	program
		.command('take-screenshot')
		.description('Take a screenshot of a webpage using ScreenshotOne')
		.option('--url <url>', 'URL of the webpage to take a screenshot of')
		.option(
			'--html <html>',
			'HTML content to render and take a screenshot of',
		)
		.option('--access-key <accessKey>', 'Your ScreenshotOne access key')
		.option(
			'--format <format>',
			'Output format (png, jpeg, webp, pdf)',
			/^(png|jpeg|webp|pdf)$/,
		)
		.option(
			'--response-type <type>',
			'Response type (image or json)',
			/^(image|json)$/,
		)
		.option(
			'--viewport-width <width>',
			'Width of the viewport in pixels',
			(value) => parseInt(value, 10),
		)
		.option(
			'--viewport-height <height>',
			'Height of the viewport in pixels',
			(value) => parseInt(value, 10),
		)
		.option(
			'--viewport-device <device>',
			'Emulate specific device (e.g., "iPhone X")',
		)
		.option('--full-page', 'Capture full page screenshot', false)
		.option(
			'--selector <selector>',
			'CSS selector to capture specific element',
		)
		.option('--image-quality <quality>', 'Image quality (1-100)', (value) =>
			parseInt(value, 10),
		)
		.option('--block-ads', 'Block ads', false)
		.option('--block-trackers', 'Block trackers', false)
		.option('--block-cookie-banners', 'Block cookie consent banners', false)
		.option(
			'--wait-until <event>',
			'When to consider navigation successful',
			/^(load|domcontentloaded|networkidle0|networkidle2)$/,
		)
		.option(
			'--delay <ms>',
			'Delay in milliseconds before taking the screenshot',
			(value) => parseInt(value, 10),
		)
		.option('--output <path>', 'Path to save the screenshot to')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/screenshotone.cli.ts',
				'take-screenshot',
			);
			try {
				commandLogger.debug('CLI take-screenshot called', {
					...options,
					access_key: options.accessKey ? '[REDACTED]' : undefined,
					html: options.html ? '[HTML CONTENT REDACTED]' : undefined,
				});

				if (!options.url && !options.html) {
					throw new Error('Either --url or --html must be provided');
				}

				const accessKey =
					options.accessKey || config.get('SCREENSHOTONE_ACCESS_KEY');

				const result = await screenshotOneController.takeScreenshot({
					url: options.url,
					html: options.html,
					access_key: accessKey,
					format: options.format,
					response_type: options.responseType,
					viewport_width: options.viewportWidth,
					viewport_height: options.viewportHeight,
					viewport_device: options.viewportDevice,
					full_page: options.fullPage,
					selector: options.selector,
					image_quality: options.imageQuality,
					block_ads: options.blockAds,
					block_trackers: options.blockTrackers,
					block_cookie_banners: options.blockCookieBanners,
					wait_until: options.waitUntil,
					delay: options.delay,
				});

				// If output path is provided, save the screenshot to a file
				if (
					options.output &&
					result.content &&
					result.content.startsWith('data:')
				) {
					const fs = await import('fs');
					const path = await import('path');

					// Extract base64 data
					const base64Data = result.content.split(',')[1];
					const buffer = Buffer.from(base64Data, 'base64');

					// Ensure directory exists
					const dir = path.dirname(options.output);
					if (!fs.existsSync(dir)) {
						fs.mkdirSync(dir, { recursive: true });
					}

					// Write file
					fs.writeFileSync(options.output, buffer);
					console.log(`Screenshot saved to ${options.output}`);
				} else {
					// Otherwise, output the result to console
					console.log(result.content);
				}
			} catch (error) {
				handleCliError(error);
			}
		});

	cliLogger.debug('ScreenshotOne CLI commands registered successfully');
}

export default { register };
