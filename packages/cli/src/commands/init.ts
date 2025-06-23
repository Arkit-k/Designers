/**
 * 🚀 Init command that developers love
 *
 * Zero-config setup that gets you productive in 30 seconds.
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';

interface InitOptions {
  force?: boolean;
  quick?: boolean;
  template?: 'react' | 'next' | 'vite';
}

interface QuickSetup {
  framework: 'react' | 'next' | 'vite' | 'auto';
  typescript: boolean;
  tailwind: boolean;
}

/**
 * 🎯 Simple config that just works
 *
 * No overwhelming options, just the essentials.
 */
const createConfig = (setup: QuickSetup) => ({
  // Basic info
  name: "My Design System",
  version: "1.0.0",

  // Framework detection
  framework: setup.framework,
  typescript: setup.typescript,

  // Styling setup
  css: {
    framework: setup.tailwind ? "tailwind" : "css",
    output: "./src/styles"
  },

  // Theme customization (optional)
  theme: {
    colors: {
      // Users can customize these
      primary: "#3b82f6",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444"
    }
  },

  // Build settings
  build: {
    watch: true,
    minify: true
  }
});

/**
 * 🚀 The init command that gets you started in 30 seconds
 */
export async function initCommand(options: InitOptions = {}) {
  console.log(chalk.cyan('\n🎨 Welcome to Designers!\n'));

  const spinner = ora();

  try {
    // Quick setup mode (default)
    if (options.quick !== false) {
      spinner.start('Setting up your design system...');

      const setup = await detectAndSetup();
      const config = createConfig(setup);

      // Write config
      await fs.writeJson('./designers.config.json', config, { spaces: 2 });

      // Install package
      await installDesigners();

      // Create starter files
      await createStarterFiles(setup);

      spinner.succeed('Design system ready!');

      console.log(chalk.green('\n✅ All done! Here\'s what we set up:\n'));
      console.log(chalk.gray(`📦 Framework: ${setup.framework}`));
      console.log(chalk.gray(`🔧 TypeScript: ${setup.typescript ? 'Yes' : 'No'}`));
      console.log(chalk.gray(`🎨 Tailwind: ${setup.tailwind ? 'Yes' : 'No'}`));

      console.log(chalk.cyan('\n🚀 Quick start:'));
      console.log(chalk.white('import { ds } from \'designers\';'));
      console.log(chalk.white('const styles = { color: ds.colors.blue[500] };'));

      console.log(chalk.gray('\n💡 Run "designers --help" for more commands\n'));

    } else {
      // Custom setup mode
      console.log(chalk.yellow('Custom setup coming soon! Using quick setup for now.\n'));
      return initCommand({ quick: true });
    }

  } catch (error: any) {
    spinner.fail('Setup failed');
    console.error(chalk.red('\n❌ Error:'), error.message);
    console.log(chalk.gray('\n💬 Need help? Open an issue: https://github.com/arkitkarmokar/designers/issues\n'));
    process.exit(1);
  }
}

/**
 * 🔍 Smart project detection
 */
async function detectAndSetup(): Promise<QuickSetup> {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');

  let packageJson: any = {};

  if (fs.existsSync(packageJsonPath)) {
    packageJson = await fs.readJson(packageJsonPath);
  }

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  return {
    framework: detectFramework(dependencies),
    typescript: fs.existsSync(tsConfigPath),
    tailwind: !!dependencies.tailwindcss,
  };
}

function detectFramework(dependencies: Record<string, string>): QuickSetup['framework'] {
  if (dependencies.next) return 'next';
  if (dependencies.vite) return 'vite';
  if (dependencies.react) return 'react';
  return 'auto';
}

/**
 * 📦 Install the designers package
 */
async function installDesigners() {
  const packageManager = detectPackageManager();
  const command = packageManager === 'npm' ? 'npm install' : `${packageManager} add`;

  try {
    execSync(`${command} designers`, { stdio: 'pipe' });
  } catch (error) {
    // Silent fail - user can install manually
    console.log(chalk.yellow('\n⚠️  Please install manually: npm install designers'));
  }
}

function detectPackageManager(): string {
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (fs.existsSync('bun.lockb')) return 'bun';
  return 'npm';
}

/**
 * 📁 Create helpful starter files
 */
async function createStarterFiles(setup: QuickSetup) {
  const ext = setup.typescript ? 'ts' : 'js';
  const jsxExt = setup.typescript ? 'tsx' : 'jsx';

  // Create a simple example component
  const exampleComponent = `import { ds } from 'designers';

export function ExampleComponent() {
  return (
    <div
      style={{
        padding: ds.spacing[6],
        backgroundColor: ds.colors.blue[50],
        borderRadius: ds.radius.lg,
        border: \`1px solid \${ds.colors.blue[200]}\`,
      }}
    >
      <h2 style={{ color: ds.colors.blue[900], margin: 0 }}>
        🎨 Designers is working!
      </h2>
      <p style={{ color: ds.colors.blue[700], margin: \`\${ds.spacing[2]} 0 0 0\` }}>
        Your design system is ready to use.
      </p>
    </div>
  );
}`;

  await fs.ensureDir('./src/components');
  await fs.writeFile(`./src/components/ExampleComponent.${jsxExt}`, exampleComponent);

  // Create CSS file if using Tailwind
  if (setup.tailwind) {
    const tailwindCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles here */`;

    await fs.ensureDir('./src/styles');
    await fs.writeFile('./src/styles/globals.css', tailwindCSS);
  }
}


}
