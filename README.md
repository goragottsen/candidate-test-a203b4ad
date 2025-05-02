# 🥼 YunoJuno Frontend Candidate Test (FreelancerHub)

Hi! First of all, thank you for applying and we appreciate you taking
the time to do this. We generally say 3-4hrs should be enough.

### 👋 Introduction

This repo contains a basic React app, called FreelancerHub. Your
task will be to setup the project and extend it!

The app consists of two TypeScript bundles, bundled by Vite; one for
the navigation and one for the dashboard. You can consider this as a
representation of the "micro-frontends" pattern, and it exists like this
because our actual app is undergoing a transition from an MPA to an SPA
and so dealing with these issues is a real-life scenario at YunoJuno.

### 📈 Goals

There are three main goals.

You are free to update the app as you please based on best practice you know.

**Setup synchronisation of Redux store state**

Because of the micro-frontends pattern, there are two Redux stores - one for
the dashboard and one for the navigation. Both apps contain a component which
allows a freelancer to change their availability.

Your job is to introduce a performant, scale-able way to ensure the state is
kept in sync between both components. When a freelancer's availability is
updated in one, it should be reflected in the other immediately.

You should think about:

- performance
- having a repeatable pattern that we could use elsewhere and apply easily

**Improve the usability/design of the dashboard availability component**

Freelancers can update their availability via the dashboard component.

It works fine, we guess - but it looks a bit strange and the fact it works
via an unstyled select drop-down feels a bit 1996.

We'd like you to apply your own flair to this component and rethink how
a freelancer would interact with it.

**Fix the navigation's availability update component**

A freelancer is meant to be able to update their availability from any page on
FreelancerHub by using the component in the navigation but currently when they
click the availability selection we are told that it does not show correctly.

Simply fix it, so that it works.

### Getting Started

1. Fork the repository<sup>☨</sup>.
1. Clone it locally & setup the environment.
1. Install dependencies:
   ```
   npm install
   ```
1. Start the development server:
   ```
   npm run dev
   ```

<sup>☨</sup> If you have privacy concerns with using your real GitHub account
please use a throwaway account instead and let us know the username.

### 📥 Submission procedure

We are big on async written communication here at YunoJuno - we need people that
can communicate their changes well to people who are not necessarily in the
same room as them over the internet. This is definitely something we pay
attention to and expect on the job.

1. Make your code changes.
1. Push to your fork.
1. Open a Pull Request against this repo, and describe your change.
1. Confirm with us that you have done so, stating your GitHub username.
