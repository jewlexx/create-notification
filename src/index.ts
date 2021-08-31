import dayjs from 'dayjs';
import relativetime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import notifier from 'node-notifier';
import { Command } from 'commander';

dayjs.extend(duration);
dayjs.extend(relativetime);

const program = new Command();
program.version(require('../package.json').version);

program
  .argument('[message]', 'The message to notify you')
  .requiredOption(
    '-t, --timeout <milliseconds>',
    'The time to wait before sending the notification',
  )
  .action((message, options) => {
    if (isNaN(options.timeout) || !options.timeout) {
      throw new Error('The timeout must be a number and must not be null');
    }

    const timeout = parseInt(options.timeout, 10);

    const humanTime = dayjs.duration(timeout, 'milliseconds').humanize();
    setTimeout(() => {
      notifier.notify({
        title: 'Create Notification',
        message:
          message || `Remember that thing you were thinking ${humanTime} ago?`,
      });
    }, timeout);
  });

program.parse(process.argv);
